import React, { Component } from 'react';
import firebase from 'firebase';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';


class LoginForm extends Component {
    state = { email: '', password: '', error: '', loading: false };
    
    onButtonPress() {
        const { email, password } = this.state;

        //This resets the error message
        this.setState({ error: '', loading: true });

        firebase.auth().signInWithEmailAndPassword(email, password)
        // this handles if the case passes this happens
            .then(this.onLoginSuccess.bind(this))
            //all goes to catch if signIn throws an error
            .catch(() => {
                // if login fails, create account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(this.onAccountCreationSuccess.bind(this))
                    .catch(() => {
                        this.setState(this.onAuthenticationFail.bind(this));
                });
            });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: 'Logged In!'
        });
    }

    onAccountCreationSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: 'Account Created!'
        });
    }

    onAuthenticationFail() {
        this.setState({ loading: false, error: 'Authentication Failed.' });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner />;
        }
        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log in
            </Button>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                        label="Email:"
                        placeholder="sydney123@gmail.com"
                    />
                </CardSection>

                <CardSection>
                    <Input 
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                        label="Password:"
                        placeholder="password"
                        secureTextEntry
                    />
                </CardSection>

                <Text style={styles.errorMessageStyle}>
                    {this.state.error}
                </Text>

                <CardSection>
                    {this.renderButton()}                    
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorMessageStyle: {
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
};

export default LoginForm;
