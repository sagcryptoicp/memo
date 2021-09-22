import React, { Component } from "react";
import MemoDataService from "../services/memo.service";
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";

export default class MyMemosList extends Component {
  constructor(props) {
    super(props);
    this.retrieveMemos = this.retrieveMemos.bind(this);

    this.state = {
      Memos: []
    };
  }

  componentDidMount() {
    this.retrieveMemos();
  }

  retrieveMemos() {
    MemoDataService.getPublishedMemos()
      .then(response => {
        this.setState({
          Memos: response
        });
        console.log(response);
      })
      .catch(e => {
        console.log(e);
      });
  }


  render() {
    const {Memos} = this.state;
    return (
      <div className="row">
          <h4>Memos List</h4>
  {Memos &&
              Memos.map((Memo, index) => (
        <Card style={{ width: '20rem' }}>
          <Card.Body>
            <Card.Title>{parseInt(Number(Memo[1].id))} -  {Memo[1].title}
              <Link
                to={"/memo/" + Memo[1].id}
                className="btn btn-warning"
              >
                 Edit
              </Link>
              </Card.Title>
            <Card.Text>
              {Memo[1].note}
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Last updated : {(new Date(parseInt(Number(Memo[1].updatedAt).toString().slice(0, -6), 10))).toLocaleDateString("en-US")} {" "}
               {(new Date(parseInt(Number(Memo[1].updatedAt).toString().slice(0, -6), 10))).toLocaleTimeString('en-US')}
              </small>
           </Card.Footer>
        </Card>
  ))
              }
      </div>

      
    );
  }
}
