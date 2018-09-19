//Importa dependencia 
var restify = require('restify');

var toddys = [];

function listar(req, res, next) {

    //Definindo o formato da response
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');

    // Envia todos os elementos do array toddys
    res.send(toddys);

    next();
}

function inserir(req, res, next) {

    //Definindo o formato da response
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');

    // Recebe todos os valores a serem inseridos no array toddys
    var lote = req.body.lote;
    var conteudo = parseInt(req.body.conteudo);
    var validade = req.body.validade;

    // Calcula o id
    if(toddys.length>0){
        var id = parseInt(toddys[toddys.length-1].id)+1;
    }
    else{
        var id = 0;
    }
    
    //Salva no array toddys
    toddys.push({
        "id": id,
        "lote": lote,
        "conteudo": conteudo,
        "validade": validade
    });

    res.send(toddys);

    next();
}

function atualizar(req, res, next) {

    //Definindo o formato da response
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');

    // Recebe os valores atualizados
    var id = parseInt(req.body.id);
    var lote = req.body.lote;
    var conteudo = parseInt(req.body.conteudo);
    var validade = req.body.validade;
    var resposta = "Not found";

    // Procura e altera o elemento com o id fornecido
    toddys.forEach(function(element) {
        if(element.id === id){
            element.lote = lote;
            element.conteudo = conteudo;
            element.validade = validade;

            resposta = element;
        }
    }, this);

    // Se não encontra o id printa "Not found"
    res.send(resposta);

    next();
}

function excluir(req, res, next) {

    //Definindo o formato da response
    res.setHeader('content-type', 'application/json');
    res.charSet('UTF-8');

    // Recebe o id do elemento a ser removido
    var id = parseInt(req.body.id);
    var resposta = "Not found";

    // Procura e remove o elemento com o id fornecido
    for (var index = 0; index < toddys.length; index++) {
        if(id === toddys[index].id){
            resposta = "Removido: " + JSON.stringify(toddys[index]);
            toddys.splice(index, 1);
        } 
    }

    // Se não encontra o id printa "Not found"
    res.send(resposta);

    next();
}

var server = restify.createServer({
    name: 'Projeto'
});

server.use(restify.plugins.bodyParser());

server.get('/listar', listar);

server.post('/inserir', inserir);

server.post('/atualizar', atualizar);

server.post('/excluir', excluir);

var port = process.env.PORT || 5000;

//Callback
server.listen(port, function() {
    console.log('%s rodando', server.name)
})