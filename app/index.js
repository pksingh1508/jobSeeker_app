import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { COLORS, icons, SIZES, images } from "../constants";

import { Nearbyjobs, Popularjobs, ScreenHeaderBtn, Welcome } from '../components';

const Home = () => {

    const router = useRouter();

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.lightWhite, flex: 1 }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: COLORS.lightWhite },
                headerShadowVisible: false,
                headerLeft: () => {
                    return <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                },
                headerRight: () => {
                    return <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
                },
                headerTitle: ""
            }} />


            {/* // using a scroll View */}
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View style={{ flex: 1, padding: SIZES.medium }}>
                    <Welcome />
                    <Popularjobs />
                    <Nearbyjobs />
                </View>
            </ScrollView>


        </SafeAreaView>
    )
}

export default Home;