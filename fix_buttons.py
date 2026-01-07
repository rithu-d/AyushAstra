import re

# Read the file
with open('templates/recommendations.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and fix the corrupted button section
# The corruption starts at line 238 where it says:
# <button onclick="startOver()" Which body parts are affected...

# Find the corrupted section and replace it
corrupted_pattern = r'<button onclick="startOver\(\)" Which body parts.*?<span class="text-sm">Lower Back</span>'

fixed_button = '''<button onclick="startOver()"
                    class="px-8 py-4 border-2 border-gray-300 rounded-full hover:border-ayurvedic-green hover:text-ayurvedic-green transition-colors">
                    Start Over
                </button>
            </div>
        </div>
    </div>

    <!-- Results Section -->
    <div id="results-section" class="hidden">
        <div class="text-center mb-8">
            <h3 class="text-3xl font-bold text-gray-800 mb-4">Your Personalized Wellness Plan</h3>
            <p class="text-gray-600">Based on your responses, here are our recommendations for your wellness journey
            </p>
        </div>

        <!-- Model Accuracy Display -->
        <div class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8">
            <div class="flex items-center justify-between">
                <div>
                    <h4 class="text-lg font-semibold text-gray-800">AI Model Accuracy</h4>
                    <p class="text-sm text-gray-600">Based on 10,000+ wellness assessments</p>
                </div>
                <div class="text-right">
                    <div class="text-3xl font-bold text-green-600">94.2%</div>
                    <div class="text-sm text-gray-600">Accuracy Rate</div>
                </div>
            </div>
            <div class="mt-4 bg-gray-200 rounded-full h-2">
                <div class="bg-green-500 h-2 rounded-full" style="width: 94.2%"></div>
            </div>
        </div>

        <!-- Recommendations will be populated by JavaScript -->
        <div id="recommendations-content"></div>

        <!-- Action Buttons -->
        <div class="flex justify-center gap-4 mt-12">
            <button onclick="saveRecommendations()" id="save-plan-btn"
                class="px-8 py-4 bg-ayurvedic-green text-white rounded-full shadow-lg hover:shadow-xl hover:bg-opacity-90 transition-all duration-300 flex items-center">
                <i class="fas fa-save mr-2"></i>
                Save Plan
            </button>
            <button onclick="startOver()"
                class="px-8 py-4 border-2 border-gray-300 rounded-full hover:border-ayurvedic-green hover:text-ayurvedic-green transition-colors">
                Start Over
            </button>
        </div>
    </div>
</div>
</div>
{% endblock %}

{% block scripts %}
<script>
    const selectionClasses = {
        active: ['border-ayurvedic-green', 'bg-ayurvedic-green', 'text-white'],
        inactive: ['border-gray-300', 'bg-white', 'text-gray-700']
    };'''

# Use regex to replace the corrupted section
content = re.sub(corrupted_pattern, fixed_button, content, flags=re.DOTALL)

# Write back
with open('templates/recommendations.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fixed corrupted button section!")
