import { getUser } from "@/utils/getUser";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  // const userDetails = await getUser();
  return (
    <div>
      <h1 className="">Welcome to Our Book World</h1>
      <h2 className="">Discover the Joy of Reading</h2>
      <div className="container">
        <Image
          src="/images/reading.png"
          alt="Benefits of reading"
          width={500}
          height={350}
        />
        <p>
          Books have the power to inspire, educate, and transform lives. Our
          website is dedicated to sharing meaningful books that encourage
          learning, personal growth, and positive thinking. Whether you enjoy
          spiritual wisdom, self-development, or thoughtful reflections, books
          provide a doorway to new ideas and perspectives.
        </p>
      </div>
      <h2>Why Reading Books Is Important</h2>
      <p>
        Reading books is one of the most powerful habits for personal
        development. It not only expands knowledge but also improves thinking,
        creativity, and emotional understanding.
      </p>
      <h3>Benefits of Reading</h3>

      <ol>
        <li>
          <h4>Improves Knowledge</h4>
          <p>
            Books introduce new ideas, information, and perspectives that help
            us learn continuously.
          </p>
        </li>
        <li>
          <h4>Enhances Focus and Concentration</h4>
          <p>
            Reading requires attention and helps train the mind to stay focused
            for longer periods.
          </p>
        </li>
        <li>
          <h4>Reduces Stress</h4>
          <p>
            Spending time with a good book can relax the mind and create a sense
            of calm.
          </p>
        </li>
        <li>
          <h4>Encourages Positive Thinking</h4>
          <p>
            Inspirational books can motivate readers and help develop a positive
            outlook on life.
          </p>
        </li>
        <li>
          <h4>Builds Creativity and Imagination</h4>
          <p>
            Books allow readers to imagine new worlds, ideas, and possibilities.
          </p>
        </li>
      </ol>
    </div>
  );
}
