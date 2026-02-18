import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: "A",
  brand: "브랜드A",
  description: "편안하고 착용감이 좋은 신발",
  price: 35000,
  imageUrl: "https://example.com/image.jpg",
};

describe("ProductCard", () => {
  it("상품 정보가 정상적으로 렌더링된다", () => {
    render(
      <ProductCard product={mockProduct} isInCart={false} onToggle={vi.fn()} />
    );

    expect(screen.getByText("브랜드A")).toBeInTheDocument();
    expect(screen.getByText("편안하고 착용감이 좋은 신발")).toBeInTheDocument();
    expect(screen.getByText("35,000원")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "담기" })).toBeInTheDocument();
  });

  it("isInCart=true일 때 버튼이 '담김'으로 표시된다", () => {
    render(
      <ProductCard product={mockProduct} isInCart={true} onToggle={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: "담김" })).toBeInTheDocument();
  });

  it("버튼 클릭 시 onToggle이 product.id로 호출된다", () => {
    const mockToggle = vi.fn();

    render(
      <ProductCard
        product={mockProduct}
        isInCart={false}
        onToggle={mockToggle}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "담기" }));
    expect(mockToggle).toHaveBeenCalledWith("A");
  });
});
