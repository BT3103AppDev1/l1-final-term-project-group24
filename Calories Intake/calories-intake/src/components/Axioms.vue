<script>
    query = '3lb carrots and a chicken sandwich'
    $.ajax({
        method: 'GET',
        url: 'https://api.calorieninjas.com/v1/nutrition?query=' + query,
        headers: { 'X-Api-Key': 'YOUR_API_KEY'},
        contentType: 'application/json',
        success: function(result) {
            console.log(result);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
        }
    });
</script>
<script src="Ljn/8+fBf3VItM38d5R/cw==7qzsCiFXen3sEHi5"></script>