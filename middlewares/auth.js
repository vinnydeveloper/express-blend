function auth(req, res, next){
    if(typeof(req.session.usuario) != "undefined"){
        return next()
    }else {
        return res.send("Você precisa está logado para ter acesso")
    }
}

module.exports = auth