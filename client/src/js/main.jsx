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
        let b = json.data.map((a) => {
          return(a.image)
        });
        let c = b.map((c) => {
          return(c.original)
        })
        let urls = c.map((d) => {
          return d.url
        })
        self.setState({
          pinImages: urls
        })
      })
    }).catch(function(err){
      console.log("err");
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
        return <a><img src={`${urlArray[i]}`}/></a>
      },
      dots: true,
      dotsClass: 'slick-dots slick-thumb',
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    return (
    	<div className="container">
      	<Slider {...settings}>
          <div><img src={urlArray[0]} /></div>
          <div><img src={urlArray[1]} /></div>
          <div><img src={urlArray[2]} /></div>
          <div><img src={urlArray[3]} /></div>
        </Slider>
      </div>
    );
  }
});

ReactDOM.render(<App />, document.getElementById("app"));
