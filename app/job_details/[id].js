import { React, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
    Text,
    View,
    SafeAreaView,
    ScrollView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';

import { Stack, useRouter, useGlobalSearchParams } from 'expo-router';

import { Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics } from '../../components';
import { COLORS, SIZES, icons } from '../../constants';
const tabs = ["About", "Qualification", "Responsibility"];

const JobDetails = () => {

    const params = useGlobalSearchParams();
    const router = useRouter();

    const id = params.id;

    const [info, setInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://jsearch.p.rapidapi.com/job-details',
        params: {
            job_id: id,
        },
        headers: {
            'X-RapidAPI-Key': '10e3654c5fmsh191df69c32527b8p1d57e1jsne223abaf709a',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setInfo(response.data.data);
            console.log(response.data);
            setIsLoading(false);
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {

    }

    const displayTabContent = () => {
        switch (activeTab) {
            case "Qualification":
                return <Specifics
                    title="Qualification"
                    points={info[0].job_required_skills ?? ['N/A']}
                />
            case "About":
                return <JobAbout
                    desc={info[0].job_description ?? "NO data available"}
                />
            case "Responsibility":
                return <Specifics
                    title="Responsibility"
                    points={info[0].job_highlights?.Responsibilities ?? ['N/A']}
                />
            default:
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
            <Stack.Screen
                options={{
                    headerStyle: { backgroundColor: COLORS.lightWhite },
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: ''
                }}
            >
            </Stack.Screen>

            <>
                <ScrollView showsHorizontalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>

                    {isLoading ? (
                        <ActivityIndicator size="large" color={COLORS.primary} />
                    ) : error ? (
                        <Text>Something went wrong</Text>
                    ) : info.length === 0 ? (
                        <Text>NO Data</Text>
                    ) : (
                        <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                            <Company
                                companyLogo={info[0].employer_logo}
                                jobTitle={info[0].job_title}
                                companyName={info[0].employer_name}
                                location={info[0].job_country}
                            />
                            <JobTabs
                                tabs={tabs}
                                activeTab={activeTab}
                                setActiveTab={setActiveTab}
                            />
                            {displayTabContent()}
                        </View>
                    )}

                </ScrollView>
                <JobFooter
                    url={info[0]?.job_google_link ?? 'https://careers.google.com/jobs/results'}
                />
            </>

        </SafeAreaView>
    )
}

export default JobDetails;