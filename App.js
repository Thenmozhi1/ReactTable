import React from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import "react-datepicker/dist/react-datepicker.css";
import { rows } from "./Utils";
import axios from 'axios';
//import matchSorter from 'match-sorter'


// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: rows,
      startDate: moment()
    };

    this.renderEditable = this.renderEditable.bind(this);
    this.drop_down = this.drop_down.bind(this);
    this.date_picker = this.date_picker.bind(this);

  }
  // handleChange() {
  //   this.setState({
  //     startDate: moment()
  //   });
  // }

  date_picker(cellInfo) {

    console.log()
    return (
      < DatePicker

        selected={moment(this.state.data[cellInfo.index][cellInfo.column.id], "MM-DD-YYYY")}
        contentEditable
        suppressContentEditableWarning
        onChange={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e._d;
          data[cellInfo.index][cellInfo.column.id] = moment(data[cellInfo.index][cellInfo.column.id], "MM-DD-YYYY");
          console.log(data[cellInfo.index][cellInfo.column.id]);
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }

  drop_down() {
    const options = [
      'Manager','HR', 'Executive', 'Developer'
    ];

    const defaultOption = options[0];
    return (
      < Dropdown
        options={options}
        onChange={this._onSelect}
        value={defaultOption}
        placeholder="Select an option" />);
  }


  renderEditable(cellInfo) {

    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  }
  render() {
    const { data } = this.state;


    return (
      <div>
        <ReactTable
          data={data}
          filterable
          // defaultFilterMethod={(filter, row) =>
          //   String(row[filter.id]) === filter.value}
          columns={[

            {
              Header: "ID", accessor: "ID", Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)


            },
            {
              Header: "Name", accessor: "Name", Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "Department", accessor: "Department", Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)

            },
            {
              Header: "Skill", accessor: "Skill", Cell: this.renderEditable,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)
            },
            {
              Header: "DOJ", accessor: "DOJ", Cell: this.date_picker,
              filterMethod: (filter, row) => {
                console.log(String(row[filter.id]));
                console.log(filter.value);
                return String(row[filter.id]).startsWith(filter.value);
              }


            },
            {
              Header: "Designation", accessor: "Designation", Cell: this.drop_down,
              filterMethod: (filter, row) =>
                row[filter.id].startsWith(filter.value)

            }]}


          defaultSorted={[
            {
              id: "ID",
              desc: true
            }
          ]
          }
          getTdProps={() => {
            return {
              style: {
                overflow: 'visible'
              }
            }
          }}
          defaultPageSize={10}
          className="-striped -highlight"
        />

      </div>
    );
  }
}

export default App;