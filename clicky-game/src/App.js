import React, { Component } from "react";
import images from "./cards.json";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    images,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    clickedImages: []
  };

  clickedImage = id => {
    // assign the state of the empty array to a let to be updated
    let clickedimages = this.state.clickedimages;
    let score = this.state.score;
    let topScore = this.state.topScore;
    this.setState({
      showAlert: 0
    });

   
    if (clickedimages.indexOf(id) === -1) {
      
      clickedimages.push(id);
      console.log(clickedimages);
      
      this.handleIncrement();
    
      this.makeShuffle();
    } else if (this.state.score === 12) {
     
      this.setState({
        showSuccess: 1,
        score: 0,
        clickedImage: []
      });
    } else {
       // alert player loss
      this.setState({
        score: 0,
        clickedImage: []
      });
      console.log("duplicate");
      this.setState({
        showAlert: 1
      });
    }

    if (score > topScore) {
      this.setState({
        topScore: score
      });
    }
  };

  handleIncrement = () => {
    
    this.setState({ score: this.state.score + 1 });
  };

 
  makeShuffle = () => {
    this.setState({ images: shuffle(images) });
  };

  render() {
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ opacity: this.state.showAlert }}
        >
          You clicked on this already, try again...
          </div>
        <div
          className="alert alert-success"
          style={{ opacity: this.state.showSuccess }}
        >
          Brilliant, you haven't clicked on duplicates!
          </div>
        <Scoreboard
          title="MoMA clicky Game"
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="row">
          {this.state.images.map(images => (
            <Card
              key={images.id}
              id={images.id}
              artist={images.artist}
             clickedImage={this.clickedImages}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;