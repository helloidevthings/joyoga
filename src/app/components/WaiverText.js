export const waiverText = `
YOGA LIABILITY WAIVER AND RELEASE

I understand that yoga includes physical movements as well as an opportunity for relaxation, stress reduction and relief of muscular tension. As is the case with any physical activity, the risk of injury, even serious or disabling, is always present and cannot be entirely eliminated. If I experience any pain or discomfort, I will listen to my body, adjust the posture, and ask for support from the instructor. I will continue to breathe smoothly.

Yoga is not a substitute for medical attention, examination, diagnosis or treatment. Yoga is not recommended and is not safe under certain medical conditions. I affirm that I alone am responsible to decide whether to practice yoga. I hereby agree to irrevocably release and waive any claims that I have now or may have hereafter against Joyanna Hirst and her instructors.

I have read and fully understand and agree to the above terms of this Liability Waiver Agreement. I am signing this agreement voluntarily and recognize that my signature serves as complete and unconditional release of all liability to the greatest extent allowed by law in the State of Florida.

ASSUMPTION OF RISK: I am aware that practicing yoga, including but not limited to the practice of yoga postures (asanas), breathing techniques (pranayama), and meditation, involves certain inherent risks, including but not limited to, the risk of physical injury. I understand and acknowledge that:
- Yoga involves physical exertion which may be strenuous
- There is a risk of injury from practicing yoga, including but not limited to sprains, strains, fractures, or other injuries
- I am responsible for consulting with a physician prior to and regarding my participation in any yoga classes
- I will not hold Joyanna Hirst, her instructors, or the facility where classes are held responsible for any injury or illness that may occur

HEALTH REPRESENTATION: I affirm that I am in good physical health and do not suffer from any medical condition that would prevent or limit my participation in yoga classes. I acknowledge that it is my responsibility to consult with a physician prior to participating in any yoga classes.

RELEASE: In consideration of being permitted to participate in yoga classes, I agree to assume full responsibility for any risks, injuries or damages, known or unknown, which I might incur as a result of participating in the program. I agree to release and hold harmless Joyanna Hirst, her instructors, and the facility where classes are held from any and all claims, liabilities, or causes of action arising out of my participation in yoga classes.

By checking the box below and submitting this form, I acknowledge that I have carefully read this waiver and release, fully understand its contents, and agree to its terms.
`;

export default function WaiverText() {
  return (
    <div className="bg-base-200 p-6 rounded-lg text-sm max-h-96 overflow-y-auto">
      <h3 className="font-bold text-lg mb-4">Liability Waiver and Release</h3>
      <div className="whitespace-pre-wrap leading-relaxed">
        {waiverText}
      </div>
    </div>
  );
}
