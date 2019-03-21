import React from 'react';

const loginTemplate = (props) => {
    return (
        <div>
            <h4 className="header2">{props.title}</h4>
            <div className="row">
                <form className="col s12" onSubmit={props.handleSubmit}>

                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-communication-email prefix"></i>
                            <input name="email" type="email" className="validate" placeholder="" onChange={props.handleChange} />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="mdi-action-lock-outline prefix"></i>
                            <input name="password" type="password" className="validate" onChange={props.handleChange} />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input className="btn cyan waves-effect waves-light right" type="submit" name="action" value="submit" style={{ backgroundColor: 'transparent' }} />

                        </div>
                    </div>
                </form>
            </div>
        </div>


    );
};

export default loginTemplate;