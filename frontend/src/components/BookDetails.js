const BookDetails = ({ book }) => {
    return(
        <div className="ms-3" >
            <h4>{book.title}</h4>
            <p><strong>Author:</strong>{book.author}</p>
            <p><strong>Description:</strong>{book.description}</p>
            <p><strong>Rating:</strong>{book.avarageRating}</p>
        </div>

    )
}

export default BookDetails