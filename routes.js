const fs= require('fs');

const requestHandler= (req,res)=>{
    const url=req.url;
    const method=req.method;
    if(url ==='/'){
        res.write('<html>');
        res.write('<head><title>Greetings!</title></head>');
        res.write('<body>');
        res.write('<h1>Hello, User!</h1>');
        res.write('<form action="/create_user" method="POST"><input type="text" name="username"><button type="submit">Send</button></form>');
        res.write('</body');
        res.write('</html>');
        return res.end();
    }
    if(url ==='/users'){
        res.write('<html>');
        res.write('<head><title>List of Users</title></head>');
        res.write('<body>');
        res.write('<ul>');
        res.write('<li>User 1</li>');
        res.write('<li>User 2</li>');
        res.write('<li>User 3</li>');
        res.write('<li>User 4</li>');
        res.write('</ul');
        res.write('</body');
        res.write('</html>');
        return res.end();
    }
    if(url==='/create_user' && method=='POST'){
        const body=[];
        req.on('data', (chunk)=>{
            body.push(chunk);
        });
        return req.on('end', () =>{
            const parsedBody= Buffer.concat(body).toString();
            const username=parsedBody.split('=')[1];
            console.log(username);
            fs.writeFile('user.txt', username, (err)=>{
                res.statusCode=302; 
                res.setHeader('Location', '/');
                return res.end();
            });
        });
        
    }
    // process.exit();
};

module.exports=requestHandler;