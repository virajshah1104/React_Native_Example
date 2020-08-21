import React, {Component} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: '',
      calculationText: '0',
    };
    this.nums = [
      ['AC', '+/-', '%', '/'],
      [7, 8, 9, '*'],
      [4, 5, 6, '-'],
      [1, 2, 3, '+'],
      ['Del', 0, '.', '='],
    ];
    this.operations = ['/', '*', '-', '+'];
  }

  calculateResult() {
    const text = this.state.resultText;
    // eslint-disable-next-line no-eval
    let result = eval(text);
    if (result === undefined) {
      result = 0;
    } else if (this.countDecimals(result) > 6) {
      result = result.toFixed(6);
    }
    this.setState({
      calculationText: result,
    });
  }

  countDecimals = function (value) {
    if (Math.floor(value) === value) {
      return 0;
    }
    return value.toString().split('.')[1].length || 0;
  };

  validate() {
    const text = this.state.resultText;
    let lastChar = text.slice(-1);
    if (this.operations.indexOf(lastChar) !== -1) {
      return false;
    } else {
      return true;
    }
  }

  buttonPressed(text) {
    if (text === '=') {
      return this.validate() && this.calculateResult();
    } else if (text === 'AC') {
      this.setState({
        calculationText: '0',
        resultText: '',
      });
      return;
    } else if (text === 'Del') {
      let value = this.state.resultText.split('').slice(0, -1).join('');
      this.setState({
        resultText: value,
      });
      return;
    } else if (text === '+/-') {
      let value = this.state.calculationText;
      value = value * -1;
      this.setState({
        calculationText: value,
      });
      return;
    } else if (text === '%') {
      let value = this.state.calculationText;
      value = value / 100;
      this.setState({
        calculationText: value,
      });
      return;
    } else if (text === '/' || text === '*' || text === '+' || text === '-') {
      let lastChar = this.state.resultText.split('').pop();
      if (this.operations.indexOf(lastChar) === -1) {
        this.setState({
          resultText: this.state.resultText + text,
        });
      }
      return;
    }
    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  render() {
    let rows = [];
    for (let i = 0; i < this.nums.length; i++) {
      let row = [];
      for (let j = 0; j < this.nums[i].length; j++) {
        row.push(
          <TouchableOpacity
            key={this.nums[i][j]}
            onPress={() => this.buttonPressed(this.nums[i][j])}
            style={
              this.nums[i][j] === 'AC' ||
              this.nums[i][j] === '+/-' ||
              this.nums[i][j] === '%' ||
              this.nums[i][j] === 'Del'
                ? [styles.btn, styles.btn_gray]
                : this.nums[i][j] === '/' ||
                  this.nums[i][j] === '*' ||
                  this.nums[i][j] === '-' ||
                  this.nums[i][j] === '+' ||
                  this.nums[i][j] === '='
                ? [styles.btn, styles.btn_orange]
                : [styles.btn]
            }>
            <Text
              style={
                this.nums[i][j] === 'AC' ||
                this.nums[i][j] === '+/-' ||
                this.nums[i][j] === '%' ||
                this.nums[i][j] === 'Del'
                  ? [styles.btnText, styles.btnText_gray]
                  : [styles.btnText]
              }>
              {this.nums[i][j]}
            </Text>
          </TouchableOpacity>,
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>,
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.displayText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculus}>
          <Text style={styles.calculusText}>{this.state.calculationText}</Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.digits}>{rows}</View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#434343',
    backgroundColor: '#434343',
    margin: 5,
  },
  btn_gray: {
    borderColor: '#d3d3d3',
    backgroundColor: '#d3d3d3',
  },
  btn_orange: {
    borderColor: '#f59f00',
    backgroundColor: '#f59f00',
  },
  btnText: {
    fontSize: 35,
    color: 'white',
  },
  btnText_gray: {
    color: 'black',
  },
  displayText: {
    fontSize: 36,
    color: 'white',
    paddingRight: 20,
    paddingTop: 35,
  },
  calculusText: {
    fontSize: 48,
    color: 'white',
    padding: 20,
  },
  display: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  calculus: {
    flex: 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttons: {
    flex: 7,
    flexDirection: 'row',
  },
  digits: {
    flex: 1,
    backgroundColor: 'black',
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5,
  },
});

export default App;
