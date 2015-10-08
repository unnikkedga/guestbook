var Vue = require('vue');

Vue.use(require('vue-resource'));

/*
 This is the jquery/javscript way of making an ajax call.

 $.ajax({
 context: this,
 url: "/api/comment",
 success: function (result) {
 this.$set("comments", result)
 }
 })*/

/*$.ajax({
 context: this,
 type: "POST",
 data: {
 author: this.author,
 text: this.text
 },
 url: "/api/comment",
 success: function(result) {
 this.comments.push(result);
 this.author = ''
 this.text = ''
 }
 })*/

/*$.ajax({
 context: comment,
 type: "DELETE",
 url: "/api/comment/" + comment.id,
 })*/




new Vue({
    el: '#guestbook',

    data: {
        comments: [],
        text: '',
        author: ''
    },

    ready: function () {
        this.getMessages();
    },

    methods: {
        getMessages: function () {
            /*get(url, [data], [success], [options])*/
            this.$http.get('./api/comment', function (returnedComments) {
                this.$set('comments', returnedComments);  //Here we set the data that we get back from the server.
            });
        },

        onCreate: function (e) {
            e.preventDefault();

            this.data = {
                author: this.author,
                text: this.text
            };
            /*delete(url, [data], [success], [options])*/
            /*the success response we use a call back function to do something.
            * After the server posts the data to mySQL it returns a response of the object created. Because the
            * Comments table and the structure of our data are the same we can pass back and forth without formating.*/
            this.$http.post('./api/comment', this.data, function (result) {
                console.log(result);
                this.comments.push(result);
                this.author = '';
                this.text = '';
            });
        },

        onDelete: function (comment) {
            /*delete(url, [data], [success], [options])*/
            this.$http.delete('./api/comment/' + comment.id, comment, function(result) {
                /*Here the server responds just with true. that the row has been deleted*/
                console.log(result);
            });

            this.comments.$remove(comment);
        }
    }
})
