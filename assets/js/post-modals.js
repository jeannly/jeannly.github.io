//When a post is clicked on in the home page, run this function
function handleCatalogueClick(post) {
    //Get its modal and close button
    var modal = document.getElementById(post)
    var close_button = modal.getElementsByClassName('modal-post-btn')[0]

    //Open modal
    modal.style.display = 'block'
    //Close modal
    close_button.onclick = function () {
        modal.style.display = 'none'
    }
    //Close modal if the background is clicked
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none'
        }
    }
}
