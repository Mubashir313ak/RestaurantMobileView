const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { role, userInfo, child, selectedClass } = useSelector(
    (state) => state.auth
  );

  const profileImg = () => {
    if (userInfo?.photo || child?.photo) {
      if (role === "parent") {
        return {
          uri: `https://school-development.s3.eu-north-1.amazonaws.com/${child?.photo}`,
        };
      } else {
        return {
          uri: `https://school-development.s3.eu-north-1.amazonaws.com/${userInfo?.photo}`,
        };
      }
    } else {
      return images.male;
    }
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            padding: moderateScale(20),
            paddingBottom: verticalScale(0),
            marginTop: verticalScale(10),
          }}
        >
          <Image
            source={profileImg()}
            style={{
              width: moderateScale(60),
              height: moderateScale(60),
              borderRadius: moderateScale(30),
            }}
          />

          <View>
            <Text
              style={{
                marginLeft: scale(10),
                color: "#000000",
                fontFamily: font.bold,
                fontSize: moderateScale(14),
              }}
            >
              {role === "parent" ? child?.fullName : userInfo?.fullName}
            </Text>
            <Text
              style={{
                marginTop: verticalScale(5),
                marginLeft: scale(10),
                fontFamily: font.regular,
                fontSize: moderateScale(12),
                color: "#64748B",
              }}
            >
              {role === "parent"
                ? `Class: ${child?.classAndSectionId?.name}`
                : role === "teacher"
                ? `Class: ${selectedClass?.classAndSectionId?.classAndSectionName}`
                : `Class: ${userInfo?.classAndSectionId?.classAndSectionName}`}
            </Text>
          </View>
        </View>
        {role === "student" && (
          <ThemeButton
            onPress={() => navigation.navigate("ProfileEdit")}
            textStyle={{ fontSize: moderateScale(13) }}
            buttonStyle={{
              marginLeft: scale(20),
              marginTop: verticalScale(10),
              borderRadius: moderateScale(7),
              alignSelf: "flex-start",
              paddingVertical: verticalScale(0.1),
            }}
            buttonText={"Edit Profile"}
          />
        )}

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: "#D9DFE6",
            paddingBottom: verticalScale(20),
          }}
        ></View>

        {/* Drawer Items */}
        {Tabs.map((item, index) => (
          <DrawerItem
            key={item.name}
            label={item.title}
            onPress={() =>
              item.name == "Logout"
                ? dispatch(logout())
                : props.navigation.navigate(item.name)
            }
            icon={({ focused, size }) => (
              <Image
                source={item.image}
                style={{
                  width: moderateScale(18),
                  height: moderateScale(18),
                  tintColor: focused ? "#043570" : "#043570",
                }}
              />
            )}
            labelStyle={{
              fontFamily: font.medium,
              fontSize: moderateScale(14),
              color: "#0C0912",
              marginLeft: -scale(10),
              marginTop: verticalScale(2),
            }}
          />
        ))}
      </View>
      <View
        style={{ marginHorizontal: scale(20), marginBottom: verticalScale(20) }}
      >
        <Image
          source={images.eduverse_logo}
          style={{ resizeMode: "contain" }}
        />
      </View>
    </DrawerContentScrollView>
  );
}

function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "black",
        drawerItemStyle: {
          marginTop: moderateScale(10),
        },
        drawerPosition: "right",
      }}
    >
      {Tabs.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
          options={{
            title: item.title,
            drawerIcon: ({ focused, size }) => (
              <Image
                source={item.image}
                style={{ width: moderateScale(22), height: moderateScale(22) }}
              />
            ),
          }}
        />
      ))}
    </Drawer.Navigator>
  );
}

export { AppDrawer };

const Tabs = [
  {
    component: MainStack,
    image: images.home,
    title: "Home",
    name: "Home",
  },
  {
    component: ChangePassword,
    image: images.lock,
    title: "Change Password",
    name: "ChangePassword",
  },
  {
    component: Syllabus,
    image: images.syllabuss,
    title: "Syllabus",
    name: "Syllabus",
  },
  {
    component: ResultStack,
    image: images.results,
    title: "Results",
    name: "Results",
  },

  {
    component: PrivacyPolicy,
    image: images.privacy_policy,
    title: "Privacy Policy",
    name: "Privacy Policy",
  },
  {
    component: HomeWorkStack,
    image: images.logout,
    title: "Logout",
    name: "Logout",
  },
];
