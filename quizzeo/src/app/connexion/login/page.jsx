import Link from "next/link";

export default function Page() {
    return (
        <div class="max-w-md w-full bg-white p-8 rounded shadow-md">
            <h2 class="text-2xl font-semibold mb-6">CONNEXION</h2>
            <form>
                <div class="mb-4">
                    <label
                        for="email"
                        class="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Entrez votre email"
                    />
                </div>
                <div class="mb-6">
                    <label
                        for="password"
                        class="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Entrez votre mot de passe"
                    />
                </div>
                <button
                    type="submit"
                    class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Se Connecter
                </button>
            </form>
            <p class="text-sm mt-4">
                Vous n'avez pas de compte ?{" "}
                <Link
                    href="/connexion/createAccount"
                    class="text-blue-500 hover:underline"
                >
                    Créer un compte
                </Link>
            </p>
        </div>
    );
}
