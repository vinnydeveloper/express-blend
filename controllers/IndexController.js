let IndexController = {
   viewContato: (req, res)=>{
       let {nome, idade} = req.query;
    res.render('contato',{nomeUsuario:nome});
   },
   confirmarContato: (req, res)=>{
        let {nome, email} = req.query;
        res.send("Recebido com sucesso as informações do: "+nome)
   }
}

module.exports = IndexController;