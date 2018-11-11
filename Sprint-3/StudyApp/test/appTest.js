var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
const app = require('../app');

chai.use(chaiHttp);

describe("App routes", function(){
  describe("GET routes", function(){
    it("Note edit page is 200", function(done){
      chai.request(app)
        .get("/notes/5bda4ea6033bf606ce57f63b/edit")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        }); 
    });
    
    it("login/homepage status is 200", function(done){
      chai.request(app)
        .get("/")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("logout page status is 200", function(done){
      chai.request(app)
        .get("/logout")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("Note menu status is 200", function(done){
      chai.request(app)
        .get("/menu")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("Register page status is 200", function(done){
      chai.request(app)
        .get("/register")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
  
    it("Timer page status is 200", function(done){
      chai.request(app)
        .get("/timer")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("Create note page status is 200", function(done){
      chai.request(app)
        .get("/notes")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("Create flashcard page status is 200", function(done){
      chai.request(app)
        .get("/flashcardsCreate")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
  });
  
  describe("POST routes", function() {
    it("Sign in page status is 200", function(done){
      chai.request(app)
        .post("/login")
        .send({username: "nil", password: "patel"})
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
    
    it("Create flashcard page status is 200", function(done){
      chai.request(app)
        .post("/flashcards")
        .end(function(err, res){
          if(err) console.log(err);
          res.should.have.status(200);
          done();
        });
    });
  }); 
});
