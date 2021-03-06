import { View, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base } from '../../styles';

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
/*    function validatePasswordTest() {
        const minLength = 4;
        const speacialChars = "!.,-?#$%^&*";
        if (Text.length < minLength ) {
            showMessage({
                message: "Password too short",
                description: "Password too short, should be min 4 characters",
                type: "warning"
            });

        }
    };*/

    function validatePassword(text:string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        if (!text.match(pattern)) {
            showMessage({
                message: "Password doesn't match the pattern",
                description: "Password should have at least 4 charecters, contain lower-case and upper-case letters, at least one special character.",
                type: "warning"
            });
        }
    };

    function validateEmail(email:string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(pattern)) {
            showMessage({
                message: "Email doesn'r match the pattern",
                description: "Email should be of type \"example@example.se\" ",
                type: "warning"
            });
        }
    }


    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>
            <Text style={Typography.label}>E-post</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validateEmail(content),
                    setAuth({ ...auth, email: content })
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                testID="email-field"
            />
            <Text style={Typography.label}>L??senord</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    validatePassword(content),
                    setAuth({ ...auth, password: content })
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
                testID="password-field"
            />
            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
                accessibilityLabel={`${title} genom att trycka`}
            />
            {title === "Logga in" &&
                <Button
                    title="Registrera ist??llet"
                    onPress={() => {
                        navigation.navigate("Register");
                    }}
                />
            }
        </View>
    );
};