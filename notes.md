# Notes

## To-do List

## Bugs

## Learning

Look into how to write a ReadME using Markdown

```
  useEffect(() => {
        const fetchQuizCategories = () => {
            fetch("https://opentdb.com/api_category.php")
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return resp.json();
                })
                .then((data) => {
                    setQuizCategories(data.trivia_categories)
                })
                .catch((error) => {
                    console.error('Fetch error:', error);
                });
        };
        fetchQuizCategories();
    }, []);
```
