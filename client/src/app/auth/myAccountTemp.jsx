import React from 'react';
import params from './signUpFields'
import Title from '../common/titleSubtitle'
params.pop()

const MyaccountTemp = (props) => {
    let { handleChange, handleSubmit, values } = props

    return (
        <div>
            <Title
                title='Alterar meus dados'
            />
            <div className="row">
                <form className="col s12" onSubmit={handleSubmit}>
                    {params.map((el, i) => (
                        el.name !== 'email' && <div className="row" key={i}>
                            <label htmlFor={el.name}>{el.label}</label>
                            <input name={el.name}                                
                                type={el.name === "confirmPassword" ? "password" : el.name === 'email' || el.name === 'password' ? el.name : 'text'}
                                defaultValue={values[el.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn cyan waves-effect waves-light right" type="submit" name="action" style={{ backgroundColor: 'transparent' }} >
                                Alterar Dados
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div >
    );
};

export default MyaccountTemp;