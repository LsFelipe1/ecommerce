import ChangeRequest from "../../src/payoutSrc/exchangeInput";

function LocalPayment() {
  const exchange = true;

  return (
    <>
      <div className="md:mx-5 mx-1 font-semibold flex flex-col md:gap-5 gap-3">
        <ChangeRequest />
      </div>
    </>
  );
}
export default LocalPayment;
