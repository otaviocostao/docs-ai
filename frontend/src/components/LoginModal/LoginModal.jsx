import React from 'react'
import './LoginModal.css'

const LoginModal = () => {
    
  return (
    <div className='login-content'>
        <h2 className='docsai-name'>DocsAI</h2>
        <form className='form-login'>
            <div className='text-area'>
                <label>E-mail:</label>
                <input type="email" className='input-login'/>
            </div>
            <div className='text-area'>
                <label >Senha:</label>
                <input type="password" className='input-login'/>
            </div>
            <div className='area-forget-pass'>
                <a href="/" className='forget-pass'>Esqueceu sua senha?</a>
            </div>
            <button type='submit' className='btn-entrar'>Entrar</button>
            <div className='area-signup'>
                <span>Não possui conta?</span> <a href="/" >Cadastre-se.</a>
            </div>
        </form>
    </div>
  )
}

export default LoginModal
