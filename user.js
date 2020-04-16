function User(json) {
    this.firstName = json.firstName || null;
    this.lastName = json.lastName || null;
    this.studentNr = json.studentNr || null;
    this.email = json.email || null;
    this.password = json.password || null;
}



module.exports = User;