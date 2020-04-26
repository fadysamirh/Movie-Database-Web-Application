var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var session = require('express-session');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: "",
  secret: 'haha',
  resave: false,
  saveUninitialized: false,
}))
//.................................................................
app.get('/', function(req, res) {
  res.render('login');
});

app.get('/registration' , function(req,res){
  res.render('registration');
});

app.get('/home' , function(req,res){
  res.render('home');
});

app.get('/action' , function(req,res){
  res.render('action');
});

app.get('/drama' , function(req,res){
  res.render('drama');
});

app.get('/horror' , function(req,res){
  res.render('horror');
});


app.get('/watchlist' , function(req,res){
      var a = fs.readFileSync("users.json");
      var b = JSON.parse(a);
      for (var i = 0 ; i < b.length ; i++)
      {
        if (b[i].name  == req.session.name)
        {
          var watch = b[i].watchlist;
          var hypwatch = [];
          for (var j = 0 ; j < watch.length ; j++)
          {
            var m = `<a href=${"/"+watch[j]}>${watch[j]} </a>`
            hypwatch.push(m);
          }
          
          res.render('watchlist' ,  {
            watchlist: hypwatch
            }) 
          break;
          }
          }
        });


app.post('/watchlist' ,function(req,res){
  res.render('watchlist');
});

app.get('/fightclub' , function(req,res){
  res.render('fightclub');
});

app.get('/godfather' , function(req,res){
  res.render('godfather');
});

app.get('/godfather2' , function(req,res){
  res.render('godfather2');
});

app.get('/scream' , function(req,res){
  res.render('scream');
});

app.get('/conjuring' , function(req,res){
  res.render('conjuring');
});

app.get('/darkknight' , function(req,res){
  res.render('darkknight');
});

app.get('/searchresults', function(req, res) {
  res.render('searchresults');
});


app.post('/register',function(req,res){
  var flag = true;
  var watchlist;
  var n = req.body.username ;
  var p = req.body.password ;
  var x = {
     name:n,
     password:p,
     watchlist:[] 
    };
     var f = fs.readFileSync("users.json");
     var y = JSON.parse(f);
     for (var i = 0 ; i < y.length ; i++)
     {
       if (y[i].name == x.name)
       {
         flag = false;
       }
     }
     if (flag == true){
       y.push(x);
      res.send("registration was successful");
    }
       else 
       {
        res.send("error , username already taken");
       }
     var str2 = JSON.stringify(y);
     fs.writeFileSync("users.json",str2);   
});


app.post('/', function(req,res){
  var flag2 = false;
  var n2 = req.body.username ;
  var p2 = req.body.password ;
  var x2 = {
     name:n2,
     password:p2 
    };
     var f2 = fs.readFileSync("users.json");
     var y2 = JSON.parse(f2);
     for (var i = 0 ; i < y2.length ; i++)
     {
       if (y2[i].name == x2.name && y2[i].password == x2.password)
       {
         flag2 = true;
         req.session.name = x2.name ;
       }
     }
     if (flag2 == true)
     {
       res.render('home');
     }
     else 
     {
       res.send("incorrect username and password");
     }
});
var flag4 = false;

function AddToWatchlist(moviename ,user)
{
     var a = fs.readFileSync("users.json");
     var b = JSON.parse(a);
     var flag3 = false;
     var x ;
     var i;
     for ( i = 0 ; i < b.length ; i++)
     {
       if (b[i].name == user)
       {
         for (var j = 0 ; j<b[i].watchlist.length ; j++)
         {
           if (b[i].watchlist[j] == moviename)
           {
             flag4 = true;
             break;
           }
         }
         if (flag4 == false){
         b[i].watchlist.push(moviename);
         flag3 = true;
         x = {
         name: b[i].name,
         password: b[i].password,
         watchlist: b[i].watchlist
         }
         break;
        }
       }
      }
     if ((flag3 == true) && (flag4 == false)){
     b.splice(i,1);
     b.push(x);
     var c = JSON.stringify(b);
     fs.writeFileSync("users.json",c);
  }
  else {
    var d = JSON.stringify(b);
    fs.writeFileSync("users.json" , d);
  }
}

app.post('/conjuring' , function(req,res){
  AddToWatchlist('conjuring' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

app.post('/darkknight' , function(req,res){
  AddToWatchlist('darkknight' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

app.post('/fightclub' , function(req,res){
  AddToWatchlist('fightclub' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

app.post('/godfather' , function(req,res){
  AddToWatchlist('godfather' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

app.post('/godfather2' , function(req,res){
  AddToWatchlist('godfather2' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

app.post('/scream' , function(req,res){
  AddToWatchlist('scream' , req.session.name);
  if (flag4 == true)
  {
    res.send("you have added this movie to your watchlist before");
    flag4 = false;
  }
  
  }
);

function isSubstring(s1,s2) 
{ 
    var M = s1.length; 
    var N = s2.length; 
  

    for (var i = 0; i <= N - M; i++) { 
        var j; 
  
        for (j = 0; j < M; j++) 
            if (s2[i + j] != s1[j]) 
                break; 
  
        if (j == M) 
            return i; 
    } 
  
    return -1; 
  }

var x = ['godfather','godfather2', 'conjuring', 'darkknight', 'fightclub', 'scream'];

app.post('/search', (req, res) => {
  const searchString = (req.body.Search).toLowerCase();
  //var result="";
  var result =[];
  for(let i=0;i<x.length;i++){
    if(isSubstring(searchString,x[i])!=-1){
     // result=result +" "+`<a href=${"/"+x[i]}>${x[i]} </a>`
     var m = `<a href=${"/"+x[i]}>${x[i]} </a>`
     result.push(m);
      
    }
  }
  if(result.length == 0){
    res.send("Movie Not Found");
  }
  else{
  //res.send(result);
  res.render('searchresults' , {res: result})
  }
});


if (process.env.PORT){
  app.listen(process.env.PORT);
}
else {
  app.listen(3000);
}


//.................................................................
module.exports = app;
