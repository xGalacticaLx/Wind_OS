function send() {
    document.form.submit()
}

$(".mat-input").focus(function () {
    $(this).parent().addClass("is-active is-completed");
});

$(".mat-input").focusout(function () {
    if ($(this).val() === "")
        $(this).parent().removeClass("is-completed");
    $(this).parent().removeClass("is-active");
})


/************/
$('#valeur').change(function () {
    if (this.value == 'Devlose') alert('Tu me cherche ?');
});