var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('react-slick');

var App = React.createClass({

  //var urll = new URL("https://api.pinterest.com/v1/boards/jyothigandhi/vada//pins/?access_token=AViJPs99Ckr9Bgo88xNa45KVeFvZFH4Zp-70AEVDe3GQ0eBCewAAAAA&fields=id%2Cimage"),
  getInitialState: function() {
    return({
      pinImages: []
    });
  },

  componentDidMount: function() {
    this.fetchPins();
  },

  fetchPins: function() {

    var self = this;

    fetch("https://api.pinterest.com/v1/boards/jyothigandhi/vada//pins/?access_token=AViJPs99Ckr9Bgo88xNa45KVeFvZFH4Zp-70AEVDe3GQ0eBCewAAAAA&fields=id%2Cimage", {
      method: 'get'
    }).then(function(response){
      response.json().then(function(json) {
        console.log(json.data);
        let b = json.data.map((a) => {
          return(a.image)
        });
        let c = b.map((c) => {
          return(c.original)
        })
        let urls = c.map((d) => {
          return d.url
        })
        console.log(urls);
        self.constructDivs(urls);
      })
    }).catch(function(err){
      console.log("err");
    })
  },

  constructDivs: function(u) {
    var s = [];
    u.forEach(function(url,i){
      s.push(
        <div><img src={{url}}/></div>
      )
    });
    console.log(s);
    this.setState({
      pinImages: s
    })
  },

  render: function() {
    return(
      <Slick foo={this.state.pinImages}/>
    );
  }
});

var Slick = React.createClass({

  render: function() {
    var urlArray = this.props.foo;
  	var settings = {
      customPaging: function(i) {
        return <div><img src='https://s-media-cache-ak0.pinimg.com/originals/6c/37/d3/6c37d3dfe8636f07ed00ae22e3b3e937.jpg'/></div>
      },
    	dots: true
    }
    return (
    	<div className="container">
      	<Slider {...settings}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Slider>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("app"));

/*
(<div><img src={urlArray[i]}/></div>)

<div><img src='https://s-media-cache-ak0.pinimg.com/originals/6c/37/d3/6c37d3dfe8636f07ed00ae22e3b3e937.jpg'/></div>
<div><img src='https://s-media-cache-ak0.pinimg.com/originals/e1/1f/81/e11f819f1b1b829db6a13d35a8e5a852.jpg'/></div>
<div><img src='https://s-media-cache-ak0.pinimg.com/originals/ef/58/29/ef5829590bfc4fe2a6c53da2efdaa6d2.jpg'/></div>
<div><img src='https://s-media-cache-ak0.pinimg.com/originals/d9/70/41/d970418835588e37e7ba52e411e2836c.jpg'/></div>
<div><img src='https://s-media-cache-ak0.pinimg.com/originals/4a/71/4b/4a714b04ae425f98e2022435fe433bcc.jpg'/></div>

"<div><img src='https://s-media-cache-ak0.pinimg.com/originals/6c/37/d3/6c37d3dfe8636f07ed00ae22e3b3e937.jpg'/></div>",
"<div><img src='https://s-media-cache-ak0.pinimg.com/originals/e1/1f/81/e11f819f1b1b829db6a13d35a8e5a852.jpg'/></div>",
"<div><img src='https://s-media-cache-ak0.pinimg.com/originals/ef/58/29/ef5829590bfc4fe2a6c53da2efdaa6d2.jpg'/></div>",
"<div><img src='https://s-media-cache-ak0.pinimg.com/originals/d9/70/41/d970418835588e37e7ba52e411e2836c.jpg'/></div>",
"<div><img src='https://s-media-cache-ak0.pinimg.com/originals/4a/71/4b/4a714b04ae425f98e2022435fe433bcc.jpg'/></div>"

fetch('https://davidwalsh.name/some/url', {
	method: 'get'
}).then(function(response) {

}).catch(function(err) {
	// Error :(
});

======

var myHeaders = new Headers();

var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };

fetch('flowers.jpg',myInit)
.then(function(response) {
  return response.blob();
})
.then(function(myBlob) {
  var objectURL = URL.createObjectURL(myBlob);
  myImage.src = objectURL;
});

*/
