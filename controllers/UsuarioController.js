const fs = require('fs');
const path =  require('path');
const bcrypt = require('bcrypt')
const {check, validationResult, body} = require('express-validator')

let usuarioJson = path.join("usuarios.json")
let UsuarioController = {
    registroForm: (req, res)=>{
        res.render('registroUsuario')
    },
    salvarForm: (req, res)=>{
        let listaDeErrors = validationResult(req);

        if(listaDeErrors.isEmpty()){
            let {nome, email, senha} = req.body;
            let {files} = req
            let senhaC = bcrypt.hashSync(senha, 10)
            let usuario = JSON.stringify({nome, email, senha:senhaC, avatar:files[0].originalname})
            fs.writeFileSync(usuarioJson, usuario)
            return res.send('Usuario cadastro com sucesso!')
        }else {
            return res.render("registroUsuario", {errors:listaDeErrors.errors})
        }     
       
       
    },

    loginForm: (req, res) =>{
        res.render('login')
    },
    logarUsuario: (req, res)=>{
        let {email, senha, logado} = req.body;
        let usuarioSalvo = fs.readFileSync(usuarioJson, {encoding:'utf-8'});
        usuarioSalvo = JSON.parse(usuarioSalvo);

        if(email != usuarioSalvo.email){
            return res.send('Usuario invalido!')
        }

        if(!bcrypt.compareSync(senha, usuarioSalvo.senha)){
            return res.send("Senha invalida!")
        }

        req.session.usuario = usuarioSalvo

        if(logado != undefined){
            console.log("entrou");
            
            res.cookie('logado', usuarioSalvo.email, {maxAge:600000})
        }
        
        
        res.redirect("/produtos")
    }   
}
module.exports = UsuarioController