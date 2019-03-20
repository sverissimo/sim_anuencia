import React from 'react';

const signupTemplate = (props) => {
    let { handleChange, handleSubmit } = props
    return (
        <div>
            <h4 className="header2">{props.title}</h4>
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-account-circle prefix"></i>
                            <input name="name" type="text" className="validate"  onChange={handleChange} />
                            <label htmlFor="first_name">Nome</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-communication-email prefix"></i>
                            <input name="email" type="email" className="validate"  onChange={handleChange} />
                            <label htmlFor="email">E-mail</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-lock-outline prefix"></i>
                            <input name="password" type="password" className="validate"  onChange={handleChange}/>
                            <label htmlFor="password">Senha</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-lock-outline prefix"></i>
                            <input name="confirmPassword" type="password" className="validate"  onChange={handleChange}/>
                            <label htmlFor="confirmPassword">Confirme sua senha</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="input-field col s12">
                        <input className="btn cyan waves-effect waves-light right" type="submit" name="action"  value="submit"/>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default signupTemplate;