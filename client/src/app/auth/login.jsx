import React from 'react';

const Login = () => {
    return (
        <div className="row" style={{marginTop:'8%'}}>
            <div className="col s12 m8 l4 offset-m2 offset-l4">
                <div className="card">

                    <div className="card-action teal lighten-1 white-text">
                        <h3>Login Form</h3>
                    </div>

                    <div className="card-content">
                        <div className="form-field">
                            <label for="username">Username</label>
                            <input type="text" id="username" />
                        </div>
                        <br />

                        <div className="form-field">
                            <label for="password">Password</label>
                            <input type="password" id="password" />
                        </div>
                        <br />

                        <div className="form-field">
                            <input type="checkbox" id="remem" />
                            <label for="remem">Rememeber me</label>

                        </div>
                        <br />

                        <div className="form-field">
                            <button className="btn-large waves-effect waves-dark" style={{width:'100%'}}>Login</button>
                        </div>
                        <br />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;