# Notes

## To-do List

Add a way for the Score to be store ussing localStorage.

## Bugs

## Learning

Below is an example of fetching from an API using promises (.then syntax). This is not as common as the `Async/Await` syntax.

```
    fetch("https://opentdb.com/api_category.php")
        .then((res) => {
            if (!res.ok) {
                throw new Error('Network response was not ok')
            }
            return res.json()
        })
        .then((data) => {
            (data.trivia_categories)
        })
        .catch((error) => {
            console.error('Fetch error:', error)
        })
```

Below is an example of doing the same as above, using the `Async/Await` syntax.

```
    const res = await fetch("https://opentdb.com/api_category.php")
    if (!res.ok) throw new Error('Network response was not ok')
    const data = await res.json()
    setQuizCategories(data.trivia_categories)

```

Cookies are not accessible to JS. Used to store more sensistive information.
