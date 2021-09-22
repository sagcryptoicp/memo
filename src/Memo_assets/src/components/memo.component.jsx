import React, { Component } from "react";
import MemoDataService from "../services/memo.service";
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'

export default class Memo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.getMemo = this.getMemo.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.state = {
      currentMemo: {
        id: null,
        title: "",
        note: "",
        status: 1 ,
        disable : false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getMemo(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentMemo: {
          ...prevState.currentMemo,
          title: title
        }
      };
    });
  }

  onChangeNote(e) {
    const note = e.target.value;
    
    this.setState(prevState => ({
      currentMemo: {
        ...prevState.currentMemo,
        note: note
      }
    }));
  }

  getMemo(id) {
    MemoDataService.get(id)
      .then(response => {
        this.setState({
          currentMemo: response.ok
        });
      
      })
      .catch(e => {
        console.log(e);
      });
  }

  
  updatePublished() {
      this.setState({
             disable : true
          });
       
    var data = {
      id: this.state.currentMemo.id,
      title: this.state.currentMemo.title,
      note: this.state.currentMemo.note,
      status:  1 
    };

    MemoDataService.update(data)
      .then(response => {
        this.setState(prevState => ({
          currentMemo: {
            ...prevState.currentMemo,
            status: status
          }
        }));
        this.setState({
            message: "The Memo was updated successfully!",
             disable : false
          });
       
       
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentMemo } = this.state;

    return (
      <div>
        {currentMemo ? (
          <div>
            <h4>Memo</h4>
            <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title> 
                  <Form.Control 
                    type="text" 
                    name="note" 
                    placeholder="title" 
                   value={currentMemo.title}
                  onChange={this.onChangeTitle}
                    /></Card.Title>
  
                <Card.Text>
                 <Form.Control 
                as="textarea"                 
                required
                 value={currentMemo.note}
                  onChange={this.onChangeNote}
                name="note" rows={3} />
                </Card.Text>
                 <Button variant="primary"  onClick={() => this.updatePublished()}  disabled={this.state.disable} >Update & Publish</Button>{' '}
              </Card.Body>
          </Card>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Memo...</p>
          </div>
        )}
      </div>
    );
  }
}
