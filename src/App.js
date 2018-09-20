import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            //MAKE SURE TO DELETE THIS BEFORE COMMITING
          });
        // event handler that accpets a func, when signed In/out this will be called
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    onSignOut() {
            firebase.auth().signOut()
                .catch((error) => console.log('Sign Out Error', error));
        }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <CardSection>
                        <Button children={'Log out'} onPress={this.onSignOut} />
                    </CardSection>
                );
            case false:
                return (<LoginForm />);
            default:
                return (
                    <Spinner size="large" />
                ); 
        }
    }

    render() {
        return (
            <View style={styles.logFormContainer}>
                <Header headerText="Authentication" />
                {this.renderContent()}
            </View>
        );
    }
}

const styles = {
    spinnerStyle: {
        backgroundColor: 'red',
    },
    logFormContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    somethingWitty: {
        borderBottomWidth: 1,
        padding: 5, 
        backgroundColor: '#fff',
        justifyContent: 'flex-start', 
        flexDirection: 'row',
        borderColor: '#ddd', 
        position: 'relative'
    }

};

export default App;
