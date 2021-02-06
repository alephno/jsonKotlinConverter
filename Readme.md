# Convert JSON to Kotlin data classes

A quick tool I made to convert a bunuch of api request/response examples into Kotlin data classes.

## How to use
1. run `npm install`
2. place JSON artifacts into their own files under the `in` diretory
3. run npm run start
4. the converted files are saved to the output directory

## Example
Given a file named client and content like:
    {
      "id": 1234,
      "secret": "abcd",
      "users": [{
        "name": "name",
        "id": "id"
      }]
    }

The script will generate a file with the following:
    data class User(val name: String, val id: String)
    data class User(val id: Int, val secret: String, val users: Array<User>)
    val user: User
