import CheckoutButton from "./CheckoutButton";

export default {
  title: "Cart/CheckoutButton",
  component: CheckoutButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "장바구니 페이지에서 사용자가 결제 단계로 이동할 수 있도록 하는 버튼 컴포넌트입니다. disabled prop을 통해 비활성화 상태를 표현할 수 있습니다.",
      },
    },
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 여부를 설정합니다.",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    onClick: {
      action: "clicked",
      description: "버튼 클릭 시 실행되는 이벤트 핸들러입니다.",
      table: {
        type: { summary: "function" },
      },
    },
  },
};

const Template = (args) => <CheckoutButton {...args} />;

export const Default = Template.bind({});
Default.args = {
  disabled: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};