import React, { Fragment, Component } from 'react';
import { Dialog, Grid, Container, TextField, Box, Button, Typography, CircularProgress, Checkbox, Link, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {Link as LinkTo} from 'react-router-dom'

//redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signUpUser } from '../../actions/SignupActions'

const initialStateData={
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
    institution:'',
    checkedB:false
}

class SignupForm extends Component{
    constructor(props) {
        super(props)
       // initial state comes from storybook else provide the default initial state
        this.state = props.stateData ? props.stateData : initialStateData;
    }

    classes={
        img:{
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        }
    }

    inputChangeHandler=(event)=>{
        this.setState({
            [event.target.name]:event.target.value
        });

        if(event.target.name==="checkedB"){
            this.setState({
                "checkedB":!this.state.checkedB
            });
        }
    }

    showPasswordClick=()=>{
        this.setState({
            showPassword:!this.state.showPassword
        });
    }

    signUpHandler= e =>{
        e.preventDefault()

        

        this.props.signUpUser(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password,
            this.state.phoneNumber,
            this.state.institution
            )
    }
    
    render(){
        let error=null;
        let emailError=null;
        let passwordErr=null;
        let fnameErr=null;
        let phoneErr=null;
        let institutionErr=null;

        if(this.props.error){
            emailError=this.props.error['email']
            passwordErr=this.props.error['password']
            fnameErr=this.props.error['name']
            phoneErr=this.props.error['phone']
            institutionErr=this.props.error['institution']
        }
        
        let confirmPasswordValidationError=null;
        let passwordValidationError=null;
        let phNoValidationError=null;
        let emailValidationError=null;

        //Email Validation
        let mailFormat= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!this.state.email.match(mailFormat)){
            error=true;
            emailValidationError="Enter a valid email address.";
        }

        //Phone Number Validation
        let phoneNumberFormat= /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
        if(!this.state.phoneNumber.match(phoneNumberFormat)){
            error=true;
            phNoValidationError="Enter valid Phone Number.";
        }

        //Password Validation
        let passwordFormat=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
        if(!this.state.password.match(passwordFormat)){
            error=true;
            passwordValidationError="Password must be between 8 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter";
        }

        //Confirm Password
        if(this.state.confirmPassword!==this.state.password){
            error=true;
            confirmPasswordValidationError="Passwords didn't match"
        }

        return <Fragment>
            <Dialog open={true} maxWidth >
                <Container style={{ width: '55vw', height:'auto', paddingTop:'30px', paddingBottom:'30px' }}>
                    
                    <Box mx={8} my={3}>
                        <Grid container direction="column" spacing={3} >
                            <Grid item xs={12}>
                                <Grid container justify="center" alignItems="center" >
                                    <Box mb={3}>
                                        <Typography variant="h4">
                                            Welcome
                                        </Typography>
                                    </Box>
                                </Grid>
    
                                <Grid container direction="row" justify="space-between">
                                    <Grid item xs={5}>
                                        <TextField
                                            fullWidth 
                                            variant="outlined"
                                            label="First Name*" 
                                            name="firstName"
                                            filled={this.state.firstName===""?false:true}
                                            error={fnameErr!==null? true : false}
                                            helperText={this.state.firstName==="" ? "This field is required" : fnameErr? fnameErr:null}
                                            value={this.state.firstName} 
                                            onChange={this.inputChangeHandler}/>
                                    </Grid>       
    
                                    <Grid item xs={5}>
                                        <TextField 
                                            fullWidth
                                            variant="outlined"
                                            name="lastName"
                                            onChange={this.inputChangeHandler} 
                                            filled={this.state.lastName===""?false:true}
                                            helperText={this.state.lastName==="" ? "This field is required" : null}
                                            value={this.state.lastName}
                                            label="Last Name*" />
                                    </Grid>       
                                </Grid>
                            </Grid>
    
                            <Grid item xs={12}>
                                
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    name="email"
                                    type="email"
                                    filled={emailValidationError!==null ? true :false}
                                    error={emailError? true : false }
                                    helperText={(emailValidationError!==null) ? emailValidationError : emailError? emailError : null}
                                    onChange={this.inputChangeHandler} 
                                    autoComplete="false"
                                    value={this.state.email}
                                    label="Email*" />
                            </Grid>
    
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    name="password"
                                    onChange={this.inputChangeHandler} 
                                    value={this.state.password}
                                    filled={passwordValidationError!==null?false:true}
                                    error={passwordErr? true : false}
                                    helperText={(passwordValidationError!==null) ? passwordValidationError : passwordErr?passwordErr:null}
                                    type={this.state.showPassword ? "text" : "password"} 
                                    label="Password*" 
                                    InputProps={{
                                        endAdornment:<InputAdornment position="end">
                                            <IconButton onClick={this.showPasswordClick} edge="end">
                                                {this.state.showPassword ? <VisibilityOff/> : <Visibility/> }
                                            </IconButton>
                                        </InputAdornment>
                                    }} />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    name="confirmPassword"
                                    onChange={this.inputChangeHandler} 
                                    value={this.state.confirmPassword}
                                    error={(confirmPasswordValidationError!==null) ? true : false}
                                    helperText={(confirmPasswordValidationError!==null) ? confirmPasswordValidationError : null}
                                    type={this.state.showPassword ? "text" : "password"} 
                                    label="Confirm Password*" />
                            </Grid>
    
                            <Grid item xs={12}>
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    value={this.state.phoneNumber}
                                    type="tel"
                                    filled={phNoValidationError?false:true} 
                                    error={phoneErr? true : false}
                                    helperText={(phNoValidationError!==null) ? phNoValidationError : phoneErr ? phoneErr :null}
                                    name="phoneNumber"
                                    onChange={this.inputChangeHandler} 
                                    label="Phone Number"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Typography>+91</Typography>
                                            </InputAdornment>
                                        ),
                                    }} />
                            </Grid>
    
                            <Grid item xs={12}>
                                
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    name="institution"
                                    type="text"
                                    filled={this.state.institution===""?false:true}
                                    error={institutionErr!==null? true : false}
                                    helperText={this.state.institution==="" ? "This field is required" : institutionErr? institutionErr:null}
                                    onChange={this.inputChangeHandler} 
                                    autoComplete="false"
                                    value={this.state.institution}
                                    label="Institution / Working at*" />
                            </Grid>

                            <Grid item xs={12} direction="row">
                                <Typography variant="subtitle2">
                                    <Checkbox
                                        checked={this.state.checkedB}
                                        onChange={this.inputChangeHandler}
                                        name="checkedB"
                                        color="primary"/>
                                    I agree to <Link>terms and conditions</Link> of Teesco and E-Cell NIT Raipur
                                </Typography>
                            </Grid>
    
                            <Grid item xs={12}>
                                <Grid container direction="row" justify="flex-end" alignItems="center">
                                    <LinkTo to='/login/'>Already a User?</LinkTo>&nbsp;&nbsp;
                                    <Button 
                                        variant="contained" 
                                        color="primary"
                                        disabled={(this.state.loading)||(!this.state.checkedB)} 
                                        onClick={this.signUpHandler}
                                    >
                                        <span>Sign Up</span>
                                        {this.state.loading ? <span style={{ paddingLeft:'15px', paddingTop:'5px', paddingBottom:'0px'}}><CircularProgress color="white" size={15} /></span> : null}
                                    </Button>
                                </Grid>
                            </Grid>
                            
                        </Grid>
                    
                    </Box>
                    
                </Container>
            </Dialog>
        </Fragment>
    }
}

const mapStateToProps = (state) => ({
    ...state.signup
  })
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    signUpUser,
  }, dispatch)

  export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)