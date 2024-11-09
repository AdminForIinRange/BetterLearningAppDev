import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { signIn } from "../../lib/appwrite";

const SignIn = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    console.log(form);
    // if (form.email === "" || form.password === "") {
    //   Alert.alert("Error", "Please fill in all fields");
    // }
    // Remove any spaces or non-alphanumeric characters from the form inputs
   

    // Alerts the user if any fields are empty
    if (!form.email || !form.password) {
      Alert.alert("Please fill in all fields");
      return;
    }

    // Sets loading state to true while submitting
    setSubmitting(true);

    try {
      // Calls createUser with the sanitized form data for signup
       await signIn(form.email, form.password);
      router.replace("/home");
      // Alerts the user if the signup was successful
    } catch (error) {
      // Alerts the user if an error occurs
      Alert.alert("Error", error.message);
    } finally {
      // Resets loading state after attempt
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full min-h-[85vh]  justify-center px-4 my-6 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          />

          <Text className="text-2xl font-semibold text-white mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            // isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
