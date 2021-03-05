import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      all_students: [],
      presentPressedList: [],
      absentPressedList: [],
    };
  }

  componentDidMount = async () => {
    var class_ref = await db.ref('/').on('value', (data) => {
      var all_students = [];
      var class_a = data.val().class_A;
      for (var i in class_a) {
        all_students.push(class_a[i]);
      }
      all_students.sort(function (a, b) {
        return a.roll_no - b.roll_no;
      });
      this.setState({ all_students: all_students });
    });
  };

  updateAttendence(roll_no, status) {
    var id = '';
    if (roll_no <= 9) {
      id = '0' + roll_no;
    } else {
      id = roll_no;
    }

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;

    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;
    var ref_path = 'class_A/' + id;
    var class_ref = db.ref(ref_path);
    class_ref.update({
      [today]: status,
    });
  }

  goToSummary = () => {
    this.props.navigation.navigate('SummaryScreen');
  };

  render() {
    var all_students = this.state.all_students;
    if (all_students.length === 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading.....</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.1 }}></View>
          <View style={{ flex: 0.8 }}>
            {all_students.map((student, index) => (
              <View key={index} style={styles.studentChartContainer}>
                <View
                  key={'name' + index}
                  style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={styles.textA}>{student.roll_no}</Text>
                  <Text style={styles.textN}>{student.name}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <TouchableOpacity
                    style={
                      this.state.presentPressedList.includes(index)
                        ? [
                            styles.presentButton,
                            { backgroundColor: 'lightgreen' },
                          ]
                        : styles.presentButton
                    }
                    onPress={() => {
                      var presentPressedList = this.state.presentPressedList;
                      presentPressedList.push(index);
                      this.setState({ presentPressedList: presentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'present');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'monaco',
                        fontWeight: 'bold',
                      }}>
                      Present
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      this.state.absentPressedList.includes(index)
                        ? [
                            styles.absentButton,
                            { backgroundColor: 'rgb(255, 128, 128)' },
                          ]
                        : styles.absentButton
                    }
                    onPress={() => {
                      var absentPressedList = this.state.absentPressedList;
                      absentPressedList.push(index);
                      this.setState({ absentPressedList: absentPressedList });
                      var roll_no = index + 1;
                      this.updateAttendence(roll_no, 'absent');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontFamily: 'monaco',
                        fontWeight: 'bold',
                      }}>
                      Absent
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
          <View style={{ flex: 0.1 }}>
            <TouchableOpacity
              style={styles.footer}
              onPress={() => {
                this.props.navigation.navigate('SummaryScreen');
              }}>
              <Text
                style={{
                  fontFamily: 'Verdana',
                  fontSize: 60,
                  color: 'yellow',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  studentChartContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    margin: 1,
  },
  presentButton: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'rgb(0, 100, 26)',
  },
  absentButton: {
    width: 80,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  footer: {
    left: 0,
    right: 0,
    bottom: 0,
    height: 67,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(200, 50, 0)',
    marginTop: 50,
  },
  textN: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'lime',
    fontFamily: 'monaco',
  },
  textA: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10,
    color: 'skyblue',
  },
});
