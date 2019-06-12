import React from 'react';

const ForgotPassword = (props) => {
    return (
        <div>
            <h4 className="header2">{props.title}</h4>
            <br /><br />
            <div className="row">
                <form className="col s12" onSubmit={props.handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-communication-email prefix"></i>
                            <input name="recoveryMail" type="email" className="validate" placeholder="" onChange={props.handleChange} />
                            <label htmlFor="recoveryMail">E-mail</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn cyan waves-effect waves-light right" type="submit" name="action" style={{ backgroundColor: 'transparent' }} >
                                Recuperar senha
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword;