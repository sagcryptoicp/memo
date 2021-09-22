import React, { Component } from "react";
import MemoDataService from "../services/memo.service";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import MemosList from "./memo-list.component";
export default class AddMemo extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.saveMemo = this.saveMemo.bind(this);
    this.newMemo = this.newMemo.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      id: null,
      title: localStorage.getItem('title') || "",
      note: localStorage.getItem('note') || "",
      status : 1,
      published: false,
      submitted: false,
      show : (localStorage.getItem('title') !== null && localStorage.getItem('note') !== null) || false,
      disable : false

    };
  }

  onChangeTitle(e) {
  localStorage.setItem('title', e.target.value);
    this.setState({
      title: e.target.value
    });
  }

  onChangeNote(e) {
    localStorage.setItem('note', e.target.value);
    this.setState({
      note: e.target.value
    });
  }

  handleClose(){
     this.setState({
      title: "",
      note : "",
      show : false,
      disable : false
    });
    // remove all
    localStorage.clear();
  }

  saveMemo() {
      this.setState({
      disable : true
    });
    var data = {
      id : 1,
      title: this.state.title,
      note: this.state.note,
      status: 1,
    };
    MemoDataService.create(data)
      .then(response => {
        this.setState({
          id: response.ok.id,
          title: response.ok.title,
          note: response.ok.note,
          published: response.ok.updatedAt,
          status: response.ok.status,
          submitted: true
        });
       // remove all
      localStorage.clear(); 
     this.setState({
      show : false
    });
      })
      .catch(e => {
        console.log(e);
      });
  }

  newMemo() {
    this.setState({
      id: null,
      title: "",
      note: "",
      published: false,
      status: 1,
      submitted: false
    });
  }

  render() {
    return (
      <div>
  <Modal show={this.state.show} onHide={this.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Do you want save exisitng Changes?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.saveMemo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
        {this.state.submitted == 1 ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newMemo}>
              Add
            </button>
          </div>
        ) : (
           <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title> 
                  <Form.Control 
                    type="text" 
                    name="note" 
                    placeholder="title" 
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    /></Card.Title>
  
                <Card.Text>
                 <Form.Control 
                as="textarea"                 
                required
                value={this.state.note}
                onChange={this.onChangeNote}
                name="note" rows={3} />
                </Card.Text>
                 <Button variant="primary" onClick={this.saveMemo}  disabled={this.state.disable} >Save Memo</Button>{' '}
              </Card.Body>
          </Card>
        )}
      </div>
    );
  }
}
