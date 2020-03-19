const fs = require('fs');
const path = require('path')
const logadoCookie = (req,res,next)=>{
    console.log(req.cookies['logado'], req.session.usuario);
    
    if(req.cookies.logado != undefined && req.session.usuario == undefined){
        let email =  req.cookie.logado;
        console.log(email);
        
        let usuarios = fs.readFileSync(path.join('./usuarios.json', {encoding:'utf-8'}))
        usuarios = JSON.parse(usuarios);
        usuarios.forEach((usuario)=>{
            if(usuario.email == email){
                req.session.usuario = usuario
            }
        })
      
       
    }
    next()  
}

module.exports = logadoCookie