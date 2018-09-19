import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
    state = { email: '', password: '', error: '' };
    
    onButtonPress() {
        const { email, password } = this.state;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .catch(() => {
                // if login fails, create account
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .catch(() => {
                        this.setState({ error: 'Authentication Failed.'});
                });
            });                
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

                <Text style={ styles.errorMessageStyle }>
                    {this.state.error}
                </Text>

                <CardSection>
                    <Button onPress={this.onButtonPress.bind(this)}>
                        Log in
                    </Button>
                </CardSection>
            </Card>
        );
    };
}

const styles = {
    errorMessageStyle: {
        color: 'red',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
};

export default LoginForm;
