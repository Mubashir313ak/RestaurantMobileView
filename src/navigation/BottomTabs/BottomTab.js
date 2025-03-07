import React from 'react';

import {
    Platform,
    StyleSheet,
} from 'react-native';
import {
    moderateScale,
    verticalScale,
} from 'react-native-size-matters';

import { images } from '@assets/images/Images';
import {
    AttendanceSvg,
    HomeSvg,
    HomeWorkSvg,
    ProfileSvg,
} from '@assets/images/SvgConverter';
import TabButton from '@components/BTab/Tab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import StudentFriend from '@screens/friend/StudentFriend';

import { useSelector } from 'react-redux';
import Dashboard from '@screens/dashboard/Dashboard';
import { HomeWorkStack } from '../Stacks/HomeWorkStack';
import { AttendanceStack } from '../Stacks/AttendanceStack';
import { ProfileStack } from '../Stacks/ProfileStack';

const Tab = createBottomTabNavigator();

const Tabs = [
    {
        name: 'HomeStack',
        component: Dashboard,
        text: 'Home',
        image: images?.home,
        fimage: images?.home,
        ImageComponent: HomeSvg,
    },
    {
        name: 'homeworkstack',
        component: HomeWorkStack,
        text: 'Homework',
        image: images?.homework,
        fimage: images?.homework,
        ImageComponent: HomeWorkSvg,
    },
    {
        name: 'attendancestack',
        component: AttendanceStack,
        text: 'Attendance',
        image: images?.attendance,
        fimage: images?.attendance,
        ImageComponent: AttendanceSvg,
    },
    {
        name: 'profilestack',
        component: ProfileStack,
        text: 'Profile',
        image: images?.profile,
        fimage: images?.profile,
        ImageComponent: ProfileSvg,
    },
    {
        name: 'studentFriend',
        component: StudentFriend,
        text: 'Friend',
        image: images?.profile,
        fimage: images?.profile,
        ImageComponent: ProfileSvg,
    },
];

const BottomTabs = () => {
    const { role } = useSelector((state) => state.auth)
    console.log('~role', role);
    let conditionalTabs;
    if (role === 'student') {
        conditionalTabs = Tabs.filter(tab => tab.text !== 'Profile');
    } else {
        conditionalTabs = Tabs.filter(tab => tab.text !== 'Friend');
        console.log('~conditionalTabs', role);

    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: Platform.OS !== 'ios',
                tabBarStyle: [styles.tabs, null],
                tabBarShowLabel: false,
                unmountOnBlur: true,
            }}>
            {conditionalTabs.map(tab => {
                const array = [
                    'Notification',
                    'Announcement',
                    'Syllabus',
                    'Result',
                    'TeacherResult',
                    'TeacherResultList',
                    'TimeTable',
                    'SelectSyllabus',
                    'AnnouncementView',
                    'Leave',
                    'LeaveDetail',
                    'ParentFees',
                    'ParentFeeDetail',
                    'ParentHomeWorkDetail',
                    'ProfileEdit',
                    'TeacherDailyAttandance',
                    'TeacherViewAttendance',
                    'TeacherSelfAttendance',
                    'TeacherAddResult',
                    'TeacherViewResult',
                    'HomeWorkDetail',
                    'TeacherCreateHomeWork',
                    'ProfileEdit',
                ];

                return (
                    <Tab.Screen
                        key={tab.name} // Add a unique key prop
                        name={tab.name}
                        component={tab.component}
                        options={({ route }) => {
                            // console.log('getFocusedRouteNameFromRoute(route) ', getFocusedRouteNameFromRoute(route))
                            const routeName = getFocusedRouteNameFromRoute(route) ?? '';
                            return {
                                tabBarStyle: {
                                    display: array.includes(routeName) ? 'none' : 'flex',
                                    height: verticalScale(65),
                                },
                                tabBarVisible: true,
                                tabBarIcon: ({ focused }) => (
                                    <TabButton
                                        focused={focused}
                                        text={tab.text}
                                        image={tab.image}
                                        fimage={tab.fimage}
                                        ImageComponent={tab.ImageComponent}
                                    />
                                ),
                            };
                        }}
                    />
                );
            })}
        </Tab.Navigator>
    );
};

export default BottomTabs;

const styles = StyleSheet.create({
    tabs: {
        display: 'flex',
        backgroundColor: 'white',
        width: '100%',
        height: Platform.OS == 'ios' ? '10%' : '10%',
        borderTopWidth: 2.5,
        borderTopColor: 'white',
        borderTopLeftRadius: moderateScale(25),
        borderTopRightRadius: moderateScale(25),
        elevation: 10,
        position: 'absolute',
    },
});
