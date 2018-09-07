var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

    var server = http.createServer(function(request, response){
    var parsedUrl = url.parse(request.url, true)
    var pathWithQuery = request.url 
    var queryString = ''
    if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
    var path = parsedUrl.pathname
    var query = parsedUrl.query
    var method = request.method




/*上面不要看*/



  if(path === '/'){
      var string = fs.readFileSync('./index.html','utf8')
      var amount = fs.readFileSync('./db','utf8')
      string = string.replace('&&&amount&&&',amount)
      response.setHeader('Content-type','text/html')
      response.write(string)
      response.end()
  }else if(path === '/style.css'){
      var string = fs.readFileSync('./style.css','utf8')
      response.setHeader('Content-type','text/css')
      response.write(string)
      response.end()
  }else if(path === '/main.js'){
      var string = fs.readFileSync('./main.js','utf8')
      response.setHeader('Content-type','application/javascript')
      response.write(string)
      response.end()
  }else if(path === '/pay'){
    var amount = fs.readFileSync('./db', 'utf8')
    var newAount = amount - 1
    fs.writeFileSync('./db', newAount)
    response.setHeader("Content-Type", "application/javascript")
    response.statusCode = 200 
    response.write(`
      ${query.callback}.call(undefined, {
        "xxx": 'success',
        "left": ${newAount}
      })
    `)
    response.end()  
  }else
  {
      response.statusCode = 404
      response.setHeader('Content-type','text/html')
      response.write('你请求的路径找不到，请自行修改路径')
      response.end()
  }


})




/*下面不要看*/







server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)