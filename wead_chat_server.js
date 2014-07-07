var express = require('express') //carregando módulo do express para manipulação das views
  , app = express() //instanciando express na vairável app
  , server = require('http').createServer(app) //instanciando servidor HTTP na variável server
  , io = require('socket.io').listen(server); //carregando módulo socket.io e escutando as requisições do servidor HTTP

var url = require('url'); //carregando módulo para manipulação da url (parse de query string)
var crypto = require('crypto'); //carregando módulo ce criptografia para geração de hash

console.log("IO configurado"); //saída no console que o sockei.io está configurado corretamente

// Configurações de renderização do express
app.set('view engine', 'ejs'); //utilizando motor de renderização ejs
app.set('views', __dirname + '/views'); //definindo caminho das views
app.engine('html', require('ejs').renderFile); //definindo renderização de arquivos html

app.use("/assets", express.static(__dirname + '/assets')); //definindo caminho dos arquivos estáticos

//escutando requisições na raíz da aplicação
app.get("/", function(req, res) {

    //conexões ilimitadas
    req.setMaxListeners(0);

    //renderizando a página inicial
    res.render("index.html", {
        title: "Pagina browser" //passando variável para a view
    });
});

//servidor HTTP "escutando" porta 5502
server.listen(5502, function(){
    console.log("Express e Socket.IO no ar.");
});

//todas as funções após a conexão do socket.io
io.sockets.on('connection', function (socket)
{
    //emitindo sinal após conexão
    socket.emit('conexao', { status: 'online', conexaoId: socket.id });

    //recebendo ação do clique
    socket.on('recebendo click', function(data){
        //aqui vai o código a ser processado quando o servidor receber este evento
    });
});
