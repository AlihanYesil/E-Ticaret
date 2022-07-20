using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;


namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(p => p.Name)
                .NotEmpty()
                .NotNull()
                    .WithMessage("Lütfen Ürün Adını Boş Geçmeyiniz")
                   .MaximumLength(150)
                   .MinimumLength(3)
                    .WithMessage("Lütfen Ürün Adını 3 ile 150 arasında giriniz");

            RuleFor(p => p.Stock)
                .NotNull()
                .NotEmpty()
                    .WithMessage("Lütfen Stock  bilgisini boş geçmeyiniz")
                .Must(s => s >= 0)
                    .WithMessage("Lütfen stock miktarini negatif değer girmeyiniz");

            RuleFor(p => p.Price)
               .NotNull()
               .NotEmpty()
                   .WithMessage("Lütfen Fiyat  bilgisini boş geçmeyiniz")
               .Must(s => s >= 0)
                    .WithMessage("Lütfen Fiyat miktarini negatif değer girmeyiniz");



        }
    }
}
