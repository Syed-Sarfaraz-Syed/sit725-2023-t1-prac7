const cardList = [{
    title: 'Butterfly 2',
    path: 'images/butterfly2.jpg',
    subTitle: 'About Butterfly 2',
    description: 'The Cabbage White Butterfly is probably the most common butterfly found in Sydney after it was accidentally introduced into Australia.',
    species: 'Cabbage white',
    link: 'https://australian.museum/learn/animals/insects/cabbage-white-butterfly/'
},
{
    title: 'Butterfly 3',
    path: 'images/butterfly3.jpg',
    subTitle: 'About Butterfly 3',
    description: 'A strikingly beautiful, red butterfly, so-named for the large blue and yellow eyes on each upperwing that bare a marked resemblance to the tail feathers of a peacock.',
    species: 'Peacock Butterfly',
    link: 'https://butterfly-conservation.org/butterflies/peacock'
},
{
    title: 'Butterfly 4',
    path: 'images/butterfly4.jpg',
    subTitle: 'About butterfly 4',
    description: 'These butterflies are beautiful with black wings, ruby red markings, and a wingspan between 2.5 – 4 inches. ',
    species: 'Ruby-spotted swallowtail',
    link: 'https://www.inaturalist.org/taxa/205140-Papilio-anchisiades'
}];

const addCards = (items) => {
    items.forEach(item => {
        let itemToAppend = '<div class="col s4 center-align">' +
            '<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' + item.path + '">' +
            '</div><div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title + '<i class="material-icons right">more_vert</i></span><p><a href="' + item.link + '">' + item.subTitle +
            '</a></p></div>' +
            '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.species + '<i class="material-icons right">close</i></span>' +
            '<p class="card-text" style="color:Black">' + item.description + '</p>' +
            '</div></div></div>';
        $("#card-section").append(itemToAppend)
    });
}

const formSubmitted = () => {
    let formData = {};
    formData.title = $('#title').val();
    formData.subTitle = $('#subTitle').val();
    formData.path = $('#path').val();
    formData.description = $('#description').val();

    console.log(formData);
    postButterfly(formData);
}

function postButterfly(butterfly) {
    $.ajax({
        url: '/api/butterfly',
        type: 'POST',
        data: butterfly,
        success: (result) => {
            if (result.statusCode === 201) {
                alert('butterfly post successful');
                location.reload();
            }
        }
    });
}

function getAllButterflies() {
    $.get('/api/butterfly', (response) => {
        // response's data is in array format, so we can use it
        if (response.statusCode === 200) {
            addCards(response.data);
        }
    });
}

let socket = io();
socket.on('number',(msg)=>{
    console.log('Random Number: ' + msg);
});


$(document).ready(function () {
    $('.materialboxed').materialbox();
    $('#formSubmit').click(() => {
        formSubmitted();
    });
    addCards(cardList);
    $('.modal').modal();
    getAllButterflies();
});