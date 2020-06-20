import React, { Component } from 'react'
// ui
import { Grid, Paper } from '@material-ui/core'
import SignupForm from '../../components/Signup/SignupForm'


export default class SignUp extends Component {
    render() {
        return (
            <div>
                <Grid
                    container
                    justify='center'
                    alignItems='center'
                    style={{
                        width: '100vw',
                        height: '100vh',
                    }}>
                    <Paper elevation={3} style={{ padding: '40px 50px' }} >
                        <SignupForm />
                    </Paper>
                </Grid>
            </div>
        )
    }
}

